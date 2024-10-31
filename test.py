
class Text:
    def __init__(self, text) -> None:
        self.text = text
        
        
class Comment(Text):
    def __init__(self, author):
        self.author = author
        super().__init__()
        
        

text = Text("123")
comment = Comment("Vitaliy")

print(comment.author)
print(comment.text)
        

