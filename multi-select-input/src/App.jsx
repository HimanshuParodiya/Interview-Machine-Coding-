import React, { useEffect, useState } from "react";
import "./App.css";
import Pill from "./components/Pill";
import Card from "./components/Card";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [allUsers, setAllUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(10);

  // console.log(suggestions);
  const fetchUser = async () => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://dummyjson.com/users/search?q=${searchTerm}&limit=100`
    );
    const data = await response.json();
    setSuggestions(data);
  };

  const fetchAllUser = async () => {
    if (skip <= total) {
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );
      console.log("Api calling");
      const responseData = await response.json();
      setAllUsers((prev) => [...prev, ...responseData.users]);
      setTotal(responseData.total);
      setSkip(responseData.skip + limit);
    }
  };

  console.log("All users", allUsers);
  console.log("Total", total);
  console.log("skip", skip);
  console.log("limit", limit);
  console.log("page", page);

  // Function to handle scroll events
  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (skip <= total) {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // Increment the page number to fetch more data
        setPage((prevPage) => prevPage + 1);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [searchTerm]);
  useEffect(() => {
    fetchAllUser();
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser((prev) => [...prev, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
  };
  const handleRemoveUser = (user) => {
    let notClickedUser = selectedUser.filter(
      (item) => item.email !== user.email
    );
    setSelectedUser(notClickedUser);
    // after removing the user form search bar add it back to suggestions

    const removedUser = new Set(selectedUserSet);
    removedUser.delete(user.email);
    setSelectedUserSet(removedUser);
  };
  // console.log("Selected user is ", selectedUser);

  return (
    <>
      <div className="user-search-container">
        <div className="user-search-input">
          {/* Pills  */}
          {selectedUser.map((user) => {
            return (
              <Pill
                key={user.email}
                image={user.image}
                text={`${user.firstName} ${user.lastName}`}
                onClick={() => handleRemoveUser(user)}
              />
            );
          })}

          {/* input field with search suggestion  */}
          <div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for a user"
            />
            {/* Search Suggestion */}
            <ul className="suggestions-list">
              {suggestions?.users?.map((user) => {
                return !selectedUserSet.has(user?.email) ? (
                  <li key={user.email} onClick={() => handleSelectUser(user)}>
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />

                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                ) : (
                  <React.Fragment key={user.email}></React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="cards-container">
        {allUsers?.map((user) => {
          return (
            <Card
              key={user.email}
              id={user.id}
              name={user.firstName}
              age={user.age}
              gender={user.gender}
              image={user.image}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
