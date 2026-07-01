import os
from typing import Optional
from app.config import settings

try:
    from anthropic import Anthropic
except ImportError:
    Anthropic = None

try:
    from groq import Groq
except ImportError:
    Groq = None

class LLMAdapter:
    def __init__(self):
        self.client = None
        self.provider = None
        
        if settings.ANTHROPIC_API_KEY and Anthropic:
            self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            self.provider = "anthropic"
        elif settings.GROQ_API_KEY and Groq:
            self.client = Groq(api_key=settings.GROQ_API_KEY)
            self.provider = "groq"
            
    def generate_text(self, prompt: str, system: Optional[str] = None) -> Optional[str]:
        if not self.client:
            print("No LLM client configured (missing API key or library).")
            return None
            
        try:
            if self.provider == "anthropic":
                messages = [{"role": "user", "content": prompt}]
                kwargs = {
                    "model": "claude-3-haiku-20240307",
                    "max_tokens": 500,
                    "messages": messages,
                }
                if system:
                    kwargs["system"] = system
                response = self.client.messages.create(**kwargs)
                return response.content[0].text
                
            elif self.provider == "groq":
                messages = []
                if system:
                    messages.append({"role": "system", "content": system})
                messages.append({"role": "user", "content": prompt})
                
                response = self.client.chat.completions.create(
                    model="llama3-8b-8192",
                    messages=messages,
                    max_tokens=500
                )
                return response.choices[0].message.content
        except Exception as e:
            print(f"LLM API Error ({self.provider}): {e}")
            return None
            
llm = LLMAdapter()
