export default function Login() {
  document.body.style.overflow = "hidden";
  return (
    <>
      <div className=" relative flex h-screen items-center justify-center bg-gray-50">
        <div className="absolute top-36 flex items-center justify-center rounded-xl shadow-xl">
          <div className="flex h-[30rem] w-[70rem] flex-row">
            <div className="flex h-[100%] w-2/3 items-center justify-center rounded-l-xl bg-white">
              <form>
                <div className="flex h-[100%] w-full flex-col ">
                  <div className="flex items-center justify-center">
                    <h1 className="text-4xl font-semibold text-black">
                      Login to your account
                    </h1>
                  </div>

                  <div className="mt-10">
                    <div className="flex flex-row text-white">
                      <input
                        type="text"
                        className="w-[25rem] rounded-md border-2 border-gray-400 px-3 py-2 shadow-md hover:shadow-inner"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mt-8">
                      <div className="flex flex-row text-white">
                        <input
                          type="password"
                          className="w-[25rem] rounded-md border-2 border-gray-400 px-3 py-2 shadow-md hover:shadow-inner  focus:shadow-none"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="m-2 mt-5 flex flex-col">
                        <label className="text-lg font-semibold">
                          You are ?
                        </label>
                        <div className="mt-2 flex w-96 flex-row gap-3 text-lg">
                          <input type="radio" name="userType" value="student" />
                          <label>Student</label>

                          <input type="radio" name="userType" value="teacher" />
                          <label>Teacher</label>

                          <input type="radio" name="userType" value="Admin" />
                          <label>Admin</label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex items-center justify-center">
                      <div className="flex flex-row text-white">
                        <button className="hover:bg-darkPrimary h-12 w-36 rounded-xl bg-primary text-xl font-semibold text-white delay-100 hover:rounded-3xl">
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex h-[100%] w-1/3 flex-col items-center justify-center rounded-r-xl bg-primary">
              <div className="text-4xl font-bold text-white">New Here ?</div>
              <div className="mt-16 flex flex-row text-white">
                <button className="h-12 w-36 rounded-xl bg-white text-xl font-semibold text-black delay-100 hover:rounded-3xl hover:bg-gray-100">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
