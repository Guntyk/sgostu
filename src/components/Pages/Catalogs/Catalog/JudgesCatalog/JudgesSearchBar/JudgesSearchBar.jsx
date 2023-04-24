import Search from "../../../../../../materials/icons/Search";
import Button from "../../../../../../common/Button/Button";
import "./JudgesSearchBar.css";

export default function JudgesSearchBar({
  setJudgesList,
  judgeClasses,
  judgesList,
  loading,
  judges,
}) {
  const filterJudges = (nameValue, categoryValue) => {
    // Returning all judges if fields are empty
    if (!nameValue && !categoryValue) {
      return judges;
    }
    // Copying judges for filtering
    let list = [...judges];
    // Filtering by name
    if (nameValue) {
      list = list.filter((judge) =>
        judge["Name Surname"].toLowerCase().includes(nameValue)
      );
    }
    // Filtering by category
    if (categoryValue) {
      list = list.filter((judge) =>
        judge["Category Judge"].includes(Number(categoryValue))
      );
    }
    return list;
  };

  function handleSearch(e) {
    e.preventDefault();
    setJudgesList(
      filterJudges(
        e.target.name.value?.toLowerCase().trim() || null,
        e.target.category?.value === "choose" ? null : e.target.category.value
      )
    );
    window.scrollTo(0, 0);
    // Reset values
    e.target.name.value = "";
    e.target.category.value = "choose";
  }

  return (
    <div className="container search-form">
      <form className="form" onSubmit={handleSearch}>
        <input
          className="input search-input"
          placeholder="Ім'я або прізвище судді"
          name="name"
        />
        <select
          name="category"
          className="search-select category-select"
          defaultValue="choose"
        >
          <option className="category-option" value="choose" disabled>
            Категорія
          </option>
          {judgeClasses.map((category) => (
            <option
              className="category-option"
              value={category.id}
              key={category.id}
            >
              {category.Category.trim()}
            </option>
          ))}
        </select>
        <Button
          className="btn-primary search-btn"
          buttonText={<Search />}
          type="submit"
        />
      </form>
      {!loading && judges.length > judgesList.length && (
        <Button
          className="reset-filters-btn"
          buttonText="Скинути фільтри"
          onClick={() => {
            setJudgesList(judges);
          }}
        />
      )}
    </div>
  );
}
