import hashlib

def calculate_hash(title: str, source_name: str) -> str:
    """Calculates a consistent hash for exact deduplication."""
    normalized = f"{title.lower().strip()}|{source_name.lower().strip()}"
    return hashlib.sha256(normalized.encode('utf-8')).hexdigest()

def get_token_overlap(title1: str, title2: str) -> float:
    """Calculates token overlap similarity between two titles."""
    tokens1 = set(title1.lower().split())
    tokens2 = set(title2.lower().split())
    
    if not tokens1 or not tokens2:
        return 0.0
        
    intersection = tokens1.intersection(tokens2)
    union = tokens1.union(tokens2)
    
    return len(intersection) / len(union)

def is_duplicate(title: str, source_name: str, existing_articles: list) -> bool:
    """
    Checks if the article is a duplicate based on exact hash or token overlap.
    existing_articles should be a list of DB article objects.
    """
    article_hash = calculate_hash(title, source_name)
    
    for article in existing_articles:
        if article.dedup_hash == article_hash:
            return True
            
        if get_token_overlap(title, article.original_title) > 0.75:
            return True
            
    return False
