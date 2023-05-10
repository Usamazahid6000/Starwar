import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Serach from "./Serach";
import { RiArrowUpDownFill } from "react-icons/ri";

const Starwar = () => {
  const [people, setPeople] = useState([]);

  //console.log('people',people);

  const [filterResult, setFilterResult] = useState("");

  const [order, setOrder] = useState("desc");

  const [currentpage, setCurrentpage] = useState([]);

  console.log(currentpage, "currentpage");

  const [currentTableData, setCurrentTableData] = useState([]);

  // console.log('currentTableData',currentTableData);

  async function fetchData() {
    const EndpointURL = "https://swapi.dev/api/people";

    let response = await fetch(EndpointURL);

    let data = await response.json();

    setPeople(data.results);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filterResult !== "") {
      const searchData = currentTableData.filter((value) => {
        return value.name.toLowerCase().includes(filterResult.toLowerCase());
      });
      setCurrentTableData(searchData);
    } else {
      Pagination();
    }
  }, [filterResult]);

  useEffect(() => {
    if (people.length > 0 && currentpage == "") {
      setCurrentpage(1);
    }
  }, [people]);

  const Pagination = () => {
    if (currentpage == 1 && people.length > 0) {
      const slicetableData = people.slice(0, 3);
      setCurrentTableData(slicetableData);
    } else if (currentpage == 2 && people.length > 0) {
      const slicetableData = people.slice(3, 6);
      setCurrentTableData(slicetableData);
    } else if (currentpage == 3 && people.length > 0) {
      const slicetableData = people.slice(6, 9);
      setCurrentTableData(slicetableData);
    }
  };

  useEffect(() => {
    Pagination();
  }, [currentpage]);

  const AscendingData = () => {
    let Ascdata = currentTableData.sort((a, b) => (b.name > a.name ? -1 : 1));

    setCurrentTableData(Ascdata);
  };

  const DescendingData = () => {
    let Descdata = [...currentTableData].sort((a, b) =>
      b.name > a.name ? 1 : -1
    );

    setCurrentTableData(Descdata);
  };

  const handleSortingChange = () => {
    if (order == "desc") {
      setOrder("asc");
      AscendingData();
    } else {
      setOrder("desc");
      DescendingData();
    }
  };

  return (
    <div>
      <div className="header">
        <Serach setFilterResult={setFilterResult} />
        <h1>Starwar</h1>
        <span>count:82</span>
      </div>

      <div className="container">
        <table className="table table-bordered top">
          <thead>
            <tr>
              <th>
                <div className="acen-icon">
                  <div>name</div>
                  <div>
                    <RiArrowUpDownFill
                      className="font"
                      onClick={handleSortingChange}
                    />
                  </div>
                </div>
              </th>
              <th>height</th>
              <th>mass</th>
              <th>hair_color</th>
              <th>skin_color</th>
              <th>eye_color</th>
              <th>birth_year</th>
              <th>gender</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData?.map((items, index) => {
              return (
                <tr key={index}>
                  <td>{items.name}</td>
                  <td>{items.height}</td>
                  <td>{items.mass}</td>
                  <td>{items.hair_color}</td>
                  <td>{items.skin_color}</td>
                  <td>{items.eye_color}</td>
                  <td>{items.birth_year}</td>
                  <td>{items.gender}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={() => setCurrentpage(1)}>
              1
            </a>
          </li>
          <li className="page-item" onClick={() => setCurrentpage(2)}>
            <a className="page-link">2</a>
          </li>
          <li className="page-item" onClick={() => setCurrentpage(3)}>
            <a className="page-link">3</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Starwar;
