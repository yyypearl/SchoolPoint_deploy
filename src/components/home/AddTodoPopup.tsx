import { theme } from "@/styles/theme";
import styled from "styled-components";
import { useState } from "react";
import Button from "../common/Button";
import CustomInput from "../common/CustomInput";
import Popup from "../common/Popup";
import Calendar from "../common/Calendar";

const AddTodoPopup = ({
  onClose,
  setShowToast,
}: {
  onClose: () => void;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const isButtonEnabled = todo !== "" && category !== "" && selectedDate !== "";

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleButtonClick = () => {
    onClose();
    setShowToast(true);
  };

  return (
    <>
      <Popup onClose={onClose} title="할 일 직접 추가하기" height="435px">
        <CustomInput
          value={todo}
          placeholder="할 일을 입력해주세요"
          onChange={(value: string) => setTodo(value)}
        />
        <RadioButtonGroup>
          {["가정통신문", "숙제", "준비물", "기타"].map(
            (categoryName, index) => (
              <RadioButton
                key={index}
                selected={category === categoryName}
                onClick={() => handleCategoryChange(categoryName)}
              >
                {categoryName}
              </RadioButton>
            )
          )}
        </RadioButtonGroup>
        <SubTitle>
          언제까지 할 일인가요?
          <Calendar value={selectedDate} onChange={handleDateChange} />
        </SubTitle>
        <Button
          text="등록하기"
          onClick={handleButtonClick}
          disabled={!isButtonEnabled}
        />
      </Popup>
    </>
  );
};

export default AddTodoPopup;

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 87px;
  ${(props) => props.theme.fonts.body3_b}
`;

const RadioButtonGroup = styled.div`
  height: 35px;
  display: flex;
  margin: 12px 0px 24px 0px;
  gap: 8px;
`;

const RadioButton = styled.label<{ selected: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  border: ${(props) =>
    props.selected ? `1px solid ${theme.colors.primary500}` : "none"};
  background-color: ${(props) =>
    props.selected ? "rgba(255, 135, 0, 0.15)" : "rgba(255, 135, 0, 0.1)"};
  color: ${(props) =>
    props.selected ? theme.colors.primary500 : theme.colors.b500};
  cursor: pointer;
  ${(props) => props.theme.fonts.body3_m};
`;