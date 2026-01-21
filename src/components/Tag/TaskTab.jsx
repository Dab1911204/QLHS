const TaskTab = () => (
  <div className="space-y-3">
    <TaskItem
      name="Xây dựng API quản lý nhân sự"
      status="Đang làm"
      deadline="30/10/2025"
    />
    <TaskItem
      name="Fix bug phân quyền"
      status="Hoàn thành"
      deadline="15/10/2025"
    />
  </div>
);

const TaskItem = ({ name, status, deadline }) => (
  <div className="border rounded p-3">
    <div className="font-medium">{name}</div>
    <div className="text-sm text-gray-600">
      Trạng thái: {status}
    </div>
    <div className="text-sm text-gray-600">
      Deadline: {deadline}
    </div>
  </div>
);
export default TaskTab;