User.destroy_all
Event.destroy_all
Gift.destroy_all

user = User.create(email: "toto@gmail.com", password: "123456", username: "toto", birthday: "1990-01-01")
Event.create(name: "Birthday", date: "2024-03-17", description: "My birthday", url: "https://www.google.com", user_id: user.id)
Gift.create(budget: 100, age: 30, genre: "neutral", occasion: "Birthday", relationship: "Friend", interests: ["Sport", "Music"], generated_list: ["T-shirt", "CD"], user_id: user.id)
