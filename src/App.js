import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Posts from './components/Posts';
import Add from './components/Add';
import Contact from "./components/Contact";
import Edit from './components/Edit';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer'

const App = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('https://ben-and-steve.herokuapp.com/')
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error))
  };

  const handleCreate = (data) => {
    axios.post('https://ben-and-steve.herokuapp.com/posts', data)
      .then((response) => {
        let newPosts = [...posts, response.data];
        setPosts(newPosts);
      })
  };

  const handleDelete = (deletedPost) => {
    axios.delete('https://ben-and-steve.herokuapp.com/posts/' + deletedPost._id)
      .then((response) => {
        let newPosts = posts.filter((post) => {
          return post._id !== deletedPost._id
        })
        setPosts(newPosts);
      })
  };

  const handleEdit = (data) => {
    axios.put('https://ben-and-steve.herokuapp.com/posts/' + data._id, data)
      .then((response) => {
        let newPosts = posts.map((post) => {
          return post._id !== data._id ? post : response.data
        })
        setPosts(newPosts);
      })
  };

  const handleContacts = (data) => {
    axios.post('https://ben-and-steve.herokuapp.com/contacts', data).then((response) => {
      alert("We have received your comments!");
    }).catch((error) => {
      alert("There was an error with your submission.");
    });
  }

  useEffect(() => {
    getPosts()
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Posts handleDelete={handleDelete} posts={posts} />} />
          <Route
            path="/about"
            element={<About />} />
          <Route
            path="/add"
            element={<Add handleCreate={handleCreate} />} />
          <Route
            path="/contact"
            element={<Contact handleContacts={handleContacts} />} />
          <Route
            path="/edit/:id"
            element={<Edit posts={posts} handleEdit={handleEdit} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App