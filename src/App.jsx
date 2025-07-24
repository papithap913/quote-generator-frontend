import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ author: '', text: '' });

  const fetchQuotes = async () => {
    try {
      const res = await axios.get('https://your-backend-url.onrender.com/api/quotes');
      setQuotes(res.data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const handleAddQuote = async () => {
    if (!newQuote.author || !newQuote.text) return;
    try {
      await axios.post('https://your-backend-url.onrender.com/api/quotes', newQuote);
      setNewQuote({ author: '', text: '' });
      fetchQuotes();
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://quote-generator-backend-h4to.onrender.com/api/quotes/${id}`);
      fetchQuotes();
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 shadow rounded bg-white space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">Quote Generator</h1>

      <div className="space-y-2">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Author"
          value={newQuote.author}
          onChange={e => setNewQuote({ ...newQuote, author: e.target.value })}
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          placeholder="Quote text"
          value={newQuote.text}
          onChange={e => setNewQuote({ ...newQuote, text: e.target.value })}
        />
        <button
          onClick={handleAddQuote}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Quote
        </button>
      </div>

      <ul className="space-y-3">
        {quotes.map((q) => (
          <li key={q.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-700">{q.text}</p>
              <p className="text-sm text-gray-500">- {q.author}</p>
            </div>
            <button
              onClick={() => handleDelete(q.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
