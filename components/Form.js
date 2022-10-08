import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormData from "form-data";
import styles from "@/styles/Form.module.css";

export default function Form({
  name,
  setName,
  personal,
  setPersonal,
  birth,
  setBirth,
  badge,
  setBadge,
  avatar,
  setAvatar,
  setAvatarUrl,
  card,
  register,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("personal", personal);
    formData.append("birth", birth);
    formData.append("badge", badge);
    formData.append("avatar", avatar);
    formData.append("card", card);
    formData.append("register", register);

    const response = await fetch("/api/creation", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
  };

  return (
    <form className={styles.form}>
      <div>
        <label className="form-label">name and surname</label>
        <input
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />
      </div>

      <div>
        <label className="form-label">personal number</label>
        <input
          className="form-control"
          onChange={(e) => setPersonal(e.target.value)}
          type="text"
          maxLength="11"
          required
        />
      </div>

      <div>
        <label className="form-label">birth date</label>
        <DatePicker
          className="form-control"
          selected={birth}
          onChange={(date) => setBirth(date)}
          dateFormat="dd/MM/yyyy"
          required
        />
      </div>

      <div>
        <label className="form-label">badge</label>
        <select
          className="form-control"
          onChange={(e) => setBadge(e.target.value)}
          required
        >
          <option value="first">First Place</option>
          <option value="second">Second Place</option>
          <option value="third">Third Place</option>
        </select>
      </div>

      <div>
        <label className="form-label">upload avatar</label>
        <input
          className="form-control"
          type="file"
          onChange={(data) => {
            setAvatarUrl(URL.createObjectURL(data.target.files[0]));
            setAvatar(data.target.files[0]);
          }}
          accept="image/*"
          required
        />
      </div>

      <div>
        <input
          className={styles.button}
          onClick={(e) => handleSubmit(e)}
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
}
