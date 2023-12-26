export default function BookStatCard({
  totalBooks,
  tags,
}: {
  totalBooks: number;
  tags: string[];
}) {
  return (
    <div className="stats mb-2 mt-4 h-48 shadow">
      <div className="stat">
        <div className="stat-title">冊数</div>
        <div className="stat-value pt-2 text-skin-lightBlue">
          {totalBooks}冊
        </div>
        <div className="stat-desc">2019年以降</div>
      </div>
      <div className="stat overflow-y-scroll">
        <div>
          {tags.map(tag => (
            // TODO: link to filter with tags
            <button className="btn btn-xs m-1">#{tag}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
