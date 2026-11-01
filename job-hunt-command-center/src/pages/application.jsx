import { use, useEffect, useState } from "react";
import ApplicationForm from "./ApplicationForm";
import CommonModal from "./CommonModal";

function Application() {
  const [showform, setshowform] = useState(false);

  //----------------serch and filter code----------------------
  const [serchTerm, setsearchTerm] = useState("");
  const [filterStatus, setfilterStatus] = useState("All Statuses");

  //---------------------------get list of items from localstorage
  const [applications, setApplication] = useState(() => {
    const savedApplications = localStorage.getItem("applications");
    return savedApplications ? JSON.parse(savedApplications) : [];
  });

  //------------------------------store data in localstorage---------------------
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  //---------------------------EDIT FORM----------------------------------
  const [editId, seteditId] = useState(null);
  const [isEditing, setIsEdit] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false);
  const [succesMessage, setsuccessMessage] = useState("");

  const handleEdit = (app) => {
    seteditId(app.id);
    setIsEdit(true);
    setshowform(true);
  };

  ///////--------------------add and update form----------------------------
  const handlesave = (data) => {
    if (isEditing) {
      setApplication((prev) =>
        prev.map((app) =>
          app.id === editId ? { ...app, ...data, id: app.id } : app,
        ),
      );

      setsuccessMessage("Application updated successfully!");
    } else {
      setApplication((prev) => [...prev, { ...data, id: Date.now() }]);
      setsuccessMessage("Application added successfully!");
    }
    setshowform(false);
    seteditId(null);
    setIsEdit(false);
    setshowSuccessModal(true);
  };

  //   -----------------------------  delete an application-----------
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const confirmDeleteApplication = () => {
    setApplication((prev) => {
      return prev.filter((appid) => appid.id !== deleteId);
    });
    setshowDeleteModal(false);
    setDeleteId(null);
  };

  //display filtered and search tern on ui
  const filteredApplications = applications.filter((app) => {
    const search = serchTerm.toLowerCase();
    const matchSearch =
      app.companyName.toLowerCase().includes(search) ||
      app.jobRole.toLowerCase().includes(search);

    const matchStatus =
      filterStatus === "All Statuses" || app.ApplicationStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  //pagination
  const [currentPage, setCurrentpage] = useState(1);
  const applicationPerPage = 3;
  const indexOfLast = currentPage * applicationPerPage;
  const indexofFirst = indexOfLast - applicationPerPage;

  const cureentpage = filteredApplications.slice(indexofFirst, indexOfLast);
  const totalPages = Math.ceil(
    filteredApplications.length / applicationPerPage,
  );

  return (
    <>
      <section>
        <main className="min-h-screen bg-slate-50 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8 flex flex-wrap justify-between gap-4">
              <div>
                <h2 className="text-slate-900 text-3xl font-bold">
                  Applications
                </h2>
                <p className="mt-2 text-slate-600">
                  Manage and track all your job applications.
                </p>
              </div>

              <button
                onClick={() => setshowform(true)}
                className="inline-flex h-10 w-auto items-center justify-center shrink-0 bg-blue-900 px-4 py-2 font-medium  rounded-lg  shadow-sm text-white hover:bg-blue-600"
              >
                {" "}
                + Add Job
              </button>
            </header>

            {/* Search and Filters */}
            <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  placeholder="Search company or job role..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  value={serchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                />
                <select
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2"
                  onChange={(e) => setfilterStatus(e.target.value)}
                  value={filterStatus}
                >
                  <option>All Statuses</option>
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
                <button
                  className="rounded px-2 py-1 bg-red-500 hover:bg-red-500 h-8 mt-4 p-8 text-white"
                  onClick={() => {
                    setsearchTerm("");
                    setfilterStatus("All Statuses");
                  }}
                >
                  Clear
                </button>
              </div>
            </section>

            {/* Applications List */}
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  All Applications
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {" "}
                  Your job application records will appear here.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-sm text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-medium">Company</th>
                      <th className="px-5 py-4 font-medium">Job Role</th>
                      <th className="px-5 py-4 font-medium">Applied Date</th>
                      <th className="px-5 py-4 font-medium">Status</th>
                      <th className="px-5 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cureentpage.length == 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-5 py-12 text-center text-slate-500"
                        >
                          {" "}
                          No applications yet. Click "+ Add Job" to get started.
                        </td>
                      </tr>
                    ) : (
                      cureentpage.map((app, index) => (
                        <tr key={index} className="border-t border-slate-200">
                          <td className="px-5 py-4">{app.companyName}</td>
                          <td className="px-5 py-4">{app.jobRole}</td>
                          <td className="px-5 py-4">{app.applydate}</td>
                          <td className="px-5 py-4">{app.ApplicationStatus}</td>
                          {/* <td className="px-5 py-4">{app.jobUrl}</td> */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="rounded-lg bg-green-400 px-3 py-2 cursor-pointer text-sm font-medium hover:bg-green-300 text-white"
                                onClick={() => {
                                  handleEdit(app);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="rounded-lg bg-red-400 px-3 py-2 cursor-pointer text-sm font-medium text-white"
                                onClick={() => {
                                  setDeleteId(app.id);
                                  setshowDeleteModal(true);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row">
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-800">
                      {filteredApplications.length === 0 ? 0 : indexofFirst + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-slate-800">
                      {Math.min(indexOfLast, filteredApplications.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-800">
                      {filteredApplications.length}
                    </span>{" "}
                    applications
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentpage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Previous
                    </button>

                    <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                      {currentPage}
                    </span>

                    <span className="text-sm text-slate-500">
                      of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentpage(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* modal code */}
          {showform && (
            <div className="fixed  inset-0 z-50 items-center justify-center bg-black/50 p-4 overflow-y-auto">
              <div className=" my-auto w-full mx-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                <button
                  type="button"
                  className="rounded-lg px-3 py-1 text-2xl text-red-500 hover:bg-slate-100"
                  onClick={() => {
                    setshowform(close);
                  }}
                >
                  &times;
                </button>
                <ApplicationForm
                  onClose={() => {
                    setshowform(false);
                    setIsEdit(false);
                  }}
                  onSave={handlesave}
                  initialData={
                    applications.find((app) => app.id === editId) || null
                  }
                  isEditing={isEditing}
                />
              </div>
            </div>
          )}
          <CommonModal
            isOpen={showDeleteModal}
            title="Delete Application Data"
            message="Are you sure you want to delete ?"
            type="danger"
            confirmText="Delete"
            cancelText="Cancel"
            showCancel={true}
            onConfirm={confirmDeleteApplication}
            onClose={() => setshowDeleteModal(false)}
          />
          <CommonModal
            isOpen={showSuccessModal}
            title="Success!!"
            message={succesMessage}
            confirmText="OK"
            onConfirm={() => setshowSuccessModal(false)}
          />
        </main>
      </section>
    </>
  );
}
export default Application;
