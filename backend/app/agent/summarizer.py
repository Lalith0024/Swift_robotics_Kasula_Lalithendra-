from app.agent.llm import llm
import json

def summarize_article(title: str, content: str) -> dict:
    """
    Summarizes the article and extracts structured data.
    Returns: {
        "title": "rewritten title",
        "summary": "2-3 sentences",
        "category": "Policy | Markets | Trade | Employment | Other",
        "sentiment": "Positive | Neutral | Negative"
    }
    """
    system_prompt = (
        "You are an economic news analyst. Given an article title and snippet, extract structured information. "
        "Return ONLY a valid JSON object with keys: title (1 sentence rewrite), summary (2-3 sentences), "
        "category (one of: Policy, Markets, Trade, Employment, Other), sentiment (Positive, Neutral, Negative)."
    )
    
    prompt = f"Title: {title}\nSnippet: {content}"
    
    try:
        response_text = llm.generate_text(prompt, system=system_prompt)
        if response_text:
            # Simple cleanup for potential markdown formatting in response
            response_text = response_text.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            return json.loads(response_text)
    except Exception as e:
        print(f"Error in summarize_article: {e}")
        
    # Fallback if LLM fails or is not configured
    return {
        "title": title,
        "summary": content[:200] + "..." if len(content) > 200 else content,
        "category": "Other",
        "sentiment": "Neutral"
    }
