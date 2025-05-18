import CategoryList from "../components/Category/CategoryList";

const CategoriesPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Browse Categories</h1>
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;
