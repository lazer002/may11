
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
function Showpage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/getuser');
                setData(response.data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);




    return (
        <div>
            <div className="container">


                <div className=" glass2">
                    <div>
                    <table>
    <thead>
        <tr>
            <th>S.no</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Gender</th>
            <th>Date Of Birth</th>
            <th>Age</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Firstname}</td>
                <td>{item.Lastname}</td>
                <td>{item.Email}</td>
                <td>{item.Country}</td>
                <td>{item.State}</td>
                <td>{item.City}</td>
                <td>{item.Gender}</td>
                <td>{item.Dateofbirth}</td>
                <td>{item.Age}</td>
            </tr>
        ))}
    </tbody>
</table>

                    </div>

                    <div>
         


                </div>
          

                </div>

            </div>
            
        </div>

        // </div>
    )
}

export default Showpage
