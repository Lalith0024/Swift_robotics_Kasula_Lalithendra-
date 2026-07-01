from app.agent.llm import llm

def is_relevant(title: str, snippet: str, topics: list[str]) -> bool:
    """
    Classifies an article as signal or noise based on the given topics.
    """
    if not topics:
        return False
        
    topics_str = ", ".join(topics)
    system_prompt = (
        "You are an economic news filter. Given an article and a list of topics to track, "
        "reply with 'SIGNAL' if it is highly relevant to at least one topic, or 'NOISE' if it is generic or unrelated. "
        "Only output SIGNAL or NOISE."
    )
    
    prompt = f"Topics: {topics_str}\nTitle: {title}\nSnippet: {snippet}"
    
    try:
        response = llm.generate_text(prompt, system=system_prompt)
        if response:
            return "SIGNAL" in response.upper()
    except Exception as e:
        print(f"Error in relevance_filter: {e}")
        
    # Keyword fallback
    combined_text = (title + " " + snippet).lower()
    for topic in topics:
        if topic.lower() in combined_text:
            return True
            
    return False
