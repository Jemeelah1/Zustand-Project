
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../Components/UseStore';

function Formula() {
  const { data, setData, searchTerm, setSearchTerm } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch data only if searchTerm is not empty
    if (searchTerm.trim() !== '') {
      axios.get(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?search=${searchTerm}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log('Error fetching data: ', error);
        });
    }
  }, [searchTerm, setData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <h1>Expense Tracker</h1>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= data.length}>
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
  },
  searchInput: {
    width: '70%',
    padding: '10px',
  },
  table: {
    width: '80%',
    margin: 'auto',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  tableHeader: {
    background: '#f2f2f2',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
};

export default Formula;
