export default function DefaultPage() {
  return (
    <div className="bg-backgroundPhoto flex h-screen w-auto items-center justify-center overflow-hidden pt-20">
      <div className="relative bottom-44 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Linking Teachers and Students for Effortless Educational Journeys...
        </h1>
        <div className="absolute top-16 flex flex-col items-center justify-center text-lg">
          <h1 className="text-zinc-600">
            EduConnect: Elevate education with streamlined communication,
            attendance, exams, and collaborative discussions—an efficient,
            secure platform fostering improved teacher-student collaboration
          </h1>
          <button className="mt-9 rounded-lg bg-gray-800 p-3 text-white delay-100 hover:rounded-full hover:bg-gray-500">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
