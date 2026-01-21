import { useState } from "react";
import Modal from "../../common/Model";
import TabButton from "../Button/TabButton";
import GeneralTab from "../../Tag/GeneralTab";
import TaskTab from "../../Tag/TaskTab";
import ReviewTab from "../../Tag/ReviewTab";

const TABS = {
  GENERAL: "general",
  TASKS: "tasks",
  REVIEW: "review",
};

const ModelDetailEmployee = ({ data, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(TABS.GENERAL);

  return (
    <Modal
      title="Thông tin chi tiết nhân sự"
      isOpen={isOpen}
      onClose={onClose}
      type={"detail"}
    >
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <TabButton
          active={activeTab === TABS.GENERAL}
          onClick={() => setActiveTab(TABS.GENERAL)}
        >
          Thông tin chung
        </TabButton>

        <TabButton
          active={activeTab === TABS.TASKS}
          onClick={() => setActiveTab(TABS.TASKS)}
        >
          Phân công công việc
        </TabButton>

        <TabButton
          active={activeTab === TABS.REVIEW}
          onClick={() => setActiveTab(TABS.REVIEW)}
        >
          Đánh giá
        </TabButton>
      </div>

      {/* Tab content */}
      {activeTab === TABS.GENERAL && <GeneralTab />}
      {activeTab === TABS.TASKS && <TaskTab />}
      {activeTab === TABS.REVIEW && <ReviewTab />}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <button className="px-4 py-2 border rounded text-white bg-sky-500 cursor-pointer" onClick={onClose}>
          Đóng
        </button>
      </div>
    </Modal>
  );
};

export default ModelDetailEmployee;
