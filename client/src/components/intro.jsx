import { useRef, useEffect } from 'react';
import tableImage from '../assets/left_table.png';
import dropdownImage from '../assets/dropdown.png';

const Intro = () => {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current?.click();
  }, []);
  return (
    <>
      <div
        className="modal fade"
        id="stepModalToggle"
        aria-hidden="false"
        aria-labelledby="stepModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="stepModalToggleLabel">
                Welcome to your dashboard!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Great work on taking a step to improve your health! Here you will
              find all of the stuff you need.
              <br></br>
              <img src={tableImage} width={'100%'} />
              <br></br>
              This table is completely interactive, the therapist you are paired
              with can see your preferences.
            </div>
            <div className="modal-footer">
              <button
                className="btn chiryo_primary_active chiryo_rounded"
                data-bs-target="#stepModalToggle2"
                data-bs-toggle="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="stepModalToggle2"
        aria-hidden="true"
        aria-labelledby="stepModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="stepModalToggleLabel2">
                How to use this?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              You can choose the time of the meeting by clicking the time item
              and setting your preferred time!
              <br></br>
              <img src={dropdownImage} width={'100%'} />
              <br></br>
              All the other fields work the same. If you no longer want to meet
              with a therapist, you can remove them from the dashboard by
              clicking the trash icon. If you
              <br></br>
              <br></br>
              think the therapist has resolved most of the problems you were
              experiencing, update the status icon!
            </div>
            <div className="modal-footer">
              <button
                className="btn chiryo_primary_active chiryo_rounded"
                data-bs-target="#stepModalToggle"
                data-bs-toggle="modal"
              >
                Back to first
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        ref={modalRef}
        className="btn btn-primary d-none"
        data-bs-target="#stepModalToggle"
        data-bs-toggle="modal"
      >
        Open first modal
      </button>
    </>
  );
};

export default Intro;
