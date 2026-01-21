import Field from "../ui/Field";

const GeneralTab = () => (
  <div className="grid grid-cols-2 gap-4">
    <Field label="Họ tên" value="Nguyễn Văn A" />
    <Field label="Email" value="a.nguyen@email.com" />
    <Field label="SĐT" value="0901234567" />
    <Field label="Vai trò dự án" value="Backend Developer" />
    <Field label="Ngày tham gia" value="01/09/2025" />
    <Field label="Mức độ tham gia (%)" value="50%" />
  </div>
);
export default GeneralTab;