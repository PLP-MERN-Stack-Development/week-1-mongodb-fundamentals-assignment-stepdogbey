
//  BASIC QUERIES
// Find all books in a specific genre
db.books.find({ genre: "Science Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 25.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "The Old Man and The Sea" })


//  ADVANCED QUERIES
// Find books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// Projection: Return only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Sort books by price ascending
db.books.find().sort({ price: 1 })

// Sort books by price descending
db.books.find().sort({ price: -1 })

// Pagination: Page 1 (5 books per page)
db.books.find().limit(5)

// Pagination: Page 2 (skip 5, limit 5)
db.books.find().skip(5).limit(5)

// AGGREGATION PIPELINES
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: ["$published_year", 0, 3] },
          "0s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


// OPTIONAL / EXTRA QUERIES
//Find books within a price range
db.books.find({ price: { $gte: 20, $lte: 50 } })

// Find books with more than 300 pages
db.books.find({ pages: { $gt: 300 } })

// Find books whose title starts with “The”
db.books.find({ title: { $regex: "^The", $options: "i" } })

// Find books published between 2000 and 2020
db.books.find({ published_year: { $gte: 2000, $lte: 2020 } })

// Find all books that are in stock
db.books.find({ in_stock: true })

// Find all books that are out of stock
db.books.find({ in_stock: false })

// Find books by a specific publisher
db.books.find({ publisher: "Penguin Random House" })

// Count total number of books
db.books.aggregate([{ $count: "total_books" }])

// Group and count books by author
db.books.aggregate([
  { $group: { _id: "$author", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])

// Get distinct genres
db.books.distinct("genre")


// INDEXING & PERFORMANCE
// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain() to analyze performance
db.books.find({ title: "1984" }).explain("executionStats")
