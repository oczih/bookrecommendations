const books = [
    {
        "id": 1,
        "title": "Atomic Habits",
        "author": "James Clear",
        "recommendedBy": [1, 2],
        "year": 2018,
        "description": "A guide to building good habits and breaking bad ones through small, incremental changes."
    },
    {
        "id": 2,
        "title": "12 Rules for Life: An Antidote to Chaos",
        "author": "Jordan B. Peterson",
        "recommendedBy": [3],
        "year": 2018,
        "description": "Life advice through essays on abstract ethical principles, psychology, mythology, religion, and the author's personal anecdotes."
    },
    {
        "id": 3,
        "title": "The 7 Habits of Highly Effective People",
        "author": "Stephen R. Covey",
        "recommendedBy": [2],
        "year": 1989,
        "description": "A framework for personal effectiveness and leadership based on aligning character with universal principles."
    },
    {
        "id": 4,
        "title": "The Subtle Art of Not Giving a F*ck",
        "author": "Mark Manson",
        "recommendedBy": [1],
        "year": 2016,
        "description": "A counterintuitive approach to living a good life by caring less about more things and focusing on what truly matters."
    },
    {
        "id": 5,
        "title": "Meditations",
        "author": "Marcus Aurelius",
        "recommendedBy": [1,3],
        "year": 180,
        "description": "Personal writings by the Roman Emperor on Stoic philosophy and self-improvement."
    },
    {
        "id": 6,
        "title": "Can't Hurt Me",
        "author": "David Goggins",
        "recommendedBy": [1,2],
        "year": 2018,
        "description": "A memoir and self-help book about mental toughness, overcoming adversity, and pushing beyond limits."
    },
    {
        "id": 7,
        "title": "Deep Work",
        "author": "Cal Newport",
        "recommendedBy": [2],
        "year": 2016,
        "description": "Rules for focused success in a distracted world, emphasizing the value of deep, undistracted work."
    },
    {
        "id": 8,
        "title": "Man's Search for Meaning",
        "author": "Viktor E. Frankl",
        "recommendedBy": [3],
        "year": 1946,
        "description": "A Holocaust survivor's lessons on finding purpose through suffering and the importance of meaning in life."
    },
    {
        "id": 9,
        "title": "The Power of Now",
        "author": "Eckhart Tolle",
        "recommendedBy": [1],
        "year": 1997,
        "description": "A guide to spiritual enlightenment through living in the present moment and letting go of past and future anxieties."
    },
    {
        "id": 10,
        "title": "Mindset: The New Psychology of Success",
        "author": "Carol S. Dweck",
        "recommendedBy": [2],
        "year": 2006,
        "description": "Explores the concept of fixed vs. growth mindsets and how beliefs shape success."
    },
    {
        "id": 11,
        "title": "The 4-Hour Workweek",
        "author": "Tim Ferriss",
        "recommendedBy": [4],
        "year": 2007,
        "description": "A blueprint for escaping the 9-5, living anywhere, and joining the new rich."
    },
    {
        "id": 12,
        "title": "Awaken the Giant Within",
        "author": "Tony Robbins",
        "recommendedBy": [5],
        "year": 1991,
        "description": "Strategies for taking control of your emotions, finances, relationships, and life."
    },
    {
        "id": 13,
        "title": "The Road Less Traveled",
        "author": "M. Scott Peck",
        "recommendedBy": [6],
        "year": 1978,
        "description": "A blend of wisdom, spirituality, and psychology for personal growth."
    },
    {
        "id": 14,
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "recommendedBy": [7],
        "year": 2011,
        "description": "An exploration of the two systems that drive the way we think and make decisions."
    },
    {
        "id": 15,
        "title": "A New Earth",
        "author": "Eckhart Tolle",
        "recommendedBy": [6],
        "year": 2005,
        "description": "A spiritual guide to personal growth and awakening to your life's purpose."
    }
]

export default books;