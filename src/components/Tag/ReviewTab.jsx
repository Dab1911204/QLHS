import Field from "../ui/Field";

const ReviewTab = () => (
  <div className="space-y-4">
    <Field label="Điểm hiệu suất" value="8.5 / 10" />

    <div>
      <label className="block text-sm font-medium mb-1">
        Nhận xét PM
      </label>
      <textarea
        rows={3}
        className="w-full border rounded px-3 py-2"
        placeholder="Nhận xét về thái độ, tiến độ, chất lượng công việc..."
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        Kỹ năng nổi bật
      </label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="VD: Java Spring, React, SQL..."
      />
    </div>
  </div>
);
export default ReviewTab;