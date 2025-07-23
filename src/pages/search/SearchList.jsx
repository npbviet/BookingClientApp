import SearchListItem from "./SearchListItem";

export default function SearchList({ searchResult = [] }) {
  return (
    <div>
      {searchResult.map((item) => (
        <SearchListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
