function Dashboard()
{const applications=JSON.parse(localStorage.getItem("applications")||"[]");
    const totalApplications=applications.length;
    const totalInterviews =applications.filter((app)=>app.ApplicationStatus==="Interview").length;
    const totalOffers=applications.filter((app)=>app.ApplicationStatus==="Offer").length;
    const pendingApplications=applications.filter((app)=>app.ApplicationStatus==="Applied").length
    return(
       <>
       <main className="bg-slate-50 p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
         {/* Dashboard Header */}
         <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
         </header>
         <p className="mt-2 text-slate-500"> Welcome to your Job Hunt Command Center.</p>
             {/* Statistics Section */}
             <section>
                <h2 className="mb-4 text-xl font-semibold text-slate-600">Overview</h2>
                {/* //Total Applications */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">  Total Applications</p>
                        <p className="mt-3 text-3xl font-bold text-slate-600">{totalApplications}</p>
                    </div>

                    {/* Interviews */}
                    <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm "> 
                        <p className="text-sm text-slate-500">Interviews</p>
                        <p className="mt-4 text-slate-600 font-bold text-3xl">{totalInterviews}</p>
                    </div>

                      {/* Offers Received */}
                      <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-600">Offers Received</p>
                        <p className="font-bold text-3xl text-slate-600">{totalOffers}</p>
                      </div>

                       {/* Pending Applications */}
                         <div className="rounded-xl border border-slate-300 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-600">Pending Applications</p>
                        <p className="font-bold text-3xl text-slate-600">{pendingApplications}</p>
                      </div>
                </div>
             </section>
                {/* Recent Applications Section */}
                <section className="mt-10 roundex-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-900">Recent Applications</h2>
                    <p className="mt-3 text-slate-500">Your job applications will appear here.</p>
                </section>

        </div>

       </main>
        </>
    )
}
export default Dashboard