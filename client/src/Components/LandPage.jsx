import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Component() {
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("auth") && localStorage.getItem("name")){
      navigate('/view')
    }
  }, []);

  const handleGetStarted = () => {
    navigate('/sign-up')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative w-full bg-cover bg-center bg-no-repeat py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mt-32 text-slate-700 text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Employee Management System
            </h1>
            <p className="mt-4 text-slate-400 font-bold text-lg">
              Our EMS platform offers a comprehensive solution for managing employee information, streamlining HR processes, and enhancing organizational efficiency.
            </p>
            <div className="mt-8">
              <button
                onClick={handleGetStarted}
                className="font-bold text-white inline-flex items-center rounded-md bg-blue-500 px-6 py-3 text-sm shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <img
          src="https://media.istockphoto.com/id/1347652268/photo/group-of-colleagues-celebrating-success.webp?s=2048x2048&w=is&k=20&c=GVzY2ieQzdMveAYEAPWUynhMSsnjcSWzL_fxw6VY75Q="
          alt="Teamwork"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ objectFit: "cover" }}
        />
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold">Efficient Employee Management</h3>
              <p className="text-muted-foreground">
                Seamlessly manage employee records, including personal details, job roles, and performance metrics with our intuitive system.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold">Streamlined HR Processes</h3>
              <p className="text-muted-foreground">
                Automate HR tasks such as onboarding, leave management, and payroll processing to save time and reduce administrative workload.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold">Advanced Reporting</h3>
              <p className="text-muted-foreground">
                Generate detailed reports on employee performance, attendance, and other key metrics to make informed decisions and drive growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Optimizing HR Operations
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our EMS platform is designed to enhance HR efficiency, improve employee engagement, and streamline organizational workflows.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-background p-6 shadow">
              <h3 className="text-2xl font-semibold">
                <span className="text-primary">24/7</span> Access
              </h3>
              <p className="mt-4 text-muted-foreground">
                Access the system anytime, anywhere, ensuring that HR and employees can manage tasks and retrieve information around the clock.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow">
              <h3 className="text-2xl font-semibold">
                <span className="text-primary">90%</span> Automation
              </h3>
              <p className="mt-4 text-muted-foreground">
                Automate routine HR tasks to minimize manual intervention and increase overall efficiency in managing employee-related activities.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow">
              <h3 className="text-2xl font-semibold">
                <span className="text-primary">50%</span> Time Savings
              </h3>
              <p className="mt-4 text-muted-foreground">
                Reduce the time spent on administrative tasks by leveraging automated processes and streamlined workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 text-muted-foreground">
              Discover how our EMS platform has transformed HR operations and enhanced employee management for various organizations.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-background p-6 shadow">
              <blockquote className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium">Emma Smith</div>
                      <div className="text-muted-foreground">HR Manager</div>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "The EMS platform has greatly simplified our HR processes. The automation and reporting features have made managing our workforce much more efficient."
                  </p>
                </div>
              </blockquote>
            </div>
            <div className="rounded-lg bg-background p-6 shadow">
              <blockquote className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium">David Johnson</div>
                      <div className="text-muted-foreground">Operations Director</div>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "The streamlined HR functionalities and real-time data have been instrumental in improving our organizational efficiency. Highly recommend!"
                  </p>
                </div>
              </blockquote>
            </div>
            <div className="rounded-lg bg-background p-6 shadow">
              <blockquote className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium">Olivia Brown</div>
                      <div className="text-muted-foreground">Employee Relations Specialist</div>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "This platform has transformed how we manage employee records and processes. The intuitive interface and comprehensive features are truly impressive."
                  </p>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
