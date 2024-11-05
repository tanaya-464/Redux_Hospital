import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import "./style.css";


const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const navigate = useNavigate();

  const [radioData, setRadioData] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All data</h2>
      <input
        class="form-check-input me-1"
        name="gender"
        checked={radioData === ""}
        type="radio"
        onChange={(e) => setRadioData("")}
      />
      <label class="form-check-label me-2">All</label>
      <input
        class="form-check-input me-1"
        name="gender"
        checked={radioData === "Male"}
        value="Male"
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label class="form-check-label me-2">Male</label>
      <input
        class="form-check-input me-1"
        name="gender"
        value="Female"
        checked={radioData === "Female"}
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label class="form-check-label me-2">Female</label>

      <div>
        {users &&
          users
            .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })
            .filter((ele) => {
              if (radioData === "Male") {
                return ele.gender === radioData;
              } else if (radioData === "Female") {
                return ele.gender === radioData;
              } else return ele;
            })

            .map((ele) => (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  {/* <h6 className="card-subtitle mb-2 text-muted">{ele.contactNumber}</h6>
                  <p className="card-text">{ele.gender}</p> */}
                  <div className="btn-group d-grid gap-2 d-md-block" role="group" aria-label="Button group">
  <button
    className="btn btn-primary custom-btn me-2" // Add margin-end for space to the right
    type="button"
    onClick={() => [setId(ele.id), setShowPopup(true)]}
  >
    View
  </button>
  <button
    className="btn btn-primary custom-btn me-2 "
    type="button"
    onClick={() => navigate(`/edit/${ele.id}`)} // Use navigate for routing
  >
    Edit
  </button>
  <button
    className="btn btn-primary custom-btn"
    type="button"
    onClick={() => dispatch(deleteUser(ele.id))}
  >
    Delete
  </button>
</div>


                  {/* <button
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link to={`/edit/${ele.id}`} className="card-link">
                    Edit
                  </Link>
                  <Link
                    onClick={() => dispatch(deleteUser(ele.id))}
                    className="card-link"
                  >
                    Delete
                  </Link> */}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;
