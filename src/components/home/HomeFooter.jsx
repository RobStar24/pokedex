const HomeFooter = () => {
  return (
    <section className="relative">
      {/* Red Section */}
      <div className="bg-red-600 h-16"></div>

      {/* Gray Section */}
      <div className="bg-gray-900 h-8"></div>

      {/* White Section */}
      <div className="bg-white h-10"></div>

      {/* Pokeball button */}
      <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 -bottom-4">
        <div className="w-[4.5rem] aspect-square bg-white border-[8px] border-gray-900 rounded-full">
          <div className="absolute w-11 aspect-square border-2 border-gray-700 rounded-full left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
};
export default HomeFooter;
