import { useEffect, useState } from "react";
import "../styles/form.css";
import CommonModal from "./CommonModal";

function ApplicationForm({onSave,onClose,initialData,isEditing}) {
         console.log(initialData);

  const[formData,setFormData]=useState(
    {
      companyName:initialData?.companyName||"",
      jobRole:initialData?.jobRole||"",
      jobUrl:initialData?.jobUrl||"",
      applydate:initialData?.applydate||"",
      ApplicationStatus:initialData?.ApplicationStatus||"applied"

    }

  );
  const[showModal,setshowModal]=useState(false);
  const[modalMessage,setModalMessage]=useState("");

  //form submitison
   const handleChange=(e)=>
    {
      const{name,value}=e.target;
      setFormData({
        ...formData,
        [name]:value,
      });
    };

    //form pass vlaue after submision data saver
    const handleSubmit=(e)=>
    {
      e.preventDefault();
      if(!formData.companyName.trim())
      {
        setModalMessage("Please enter the Company name");
        setshowModal(true);
        return;
      }
      if(!formData.jobRole.trim())
      {
        setModalMessage("Please enter the job role")
        setshowModal(true);
        return;
      }
      if(!formData.jobUrl.trim())
      {
        setModalMessage("Please enter the job url")
        setshowModal(true);
        return;

      }
       if(!formData.applydate.trim())
      {
        setModalMessage("Please enter the applied date")
        setshowModal(true);
        return;

      }
       if(!formData.ApplicationStatus.trim())
      {
        setModalMessage("Please enter the Application status")
        setshowModal(true);
        return;

      }
      onSave(formData);

    }


   
  return (

    <>
      <main className="min-h-screen p-8 md:p-10">
        <div>
          <h2 className="font-semibold text-xl">{isEditing?"Edit Application":"Add New Application"}</h2>
          <p className="mt-2 text-slate-400">
            Enter the details of the job you applied for.
          </p>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. Accenture"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="jobRole">Job Role</label>
              <input
                type="text"
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                placeholder="e.g. MERN Stack Developer"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="jobUrl">Job URL</label>
              <input
                type="url"
                id="jobUrl"
                value={formData.jobUrl}
                onChange={handleChange}

                name="jobUrl"
                placeholder="https://company.com/careers"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="mt-4">
              <label htmlFor="applydate">Applied Date</label>
              <input type="date" id="applydate" name="applydate" value={formData.applydate} onChange={handleChange}/>
            </div>

            <div className="mt-6">
              <label>Application Status</label>
              <select className="w-full rounded-lg border border-slate-300 px-4 py-2 mt-2 focus:border-blue-300" name="ApplicationStatus" value={formData.ApplicationStatus} onChange={handleChange}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button type="button" className="px-4 py-2 border border-slate-300  rounded-lg font-medium hover:bg-red-500 cursor-pointer hover:text-white"  onClick={onClose}>Cancel</button>
             <button type="submit" className="px-4 border border-slate-300 rounded-lg hover:bg-green-500 cursor-pointer hover:text-white">{isEditing?"Update Application":"Save Application"}</button>

            </div>
        <CommonModal isOpen={showModal} title="Almost There!" message={modalMessage} confirmText="OK" onConfirm={()=>setshowModal(false)} />

          </form>
        </div>
      </main>
    </>
  );
}
export default ApplicationForm;
