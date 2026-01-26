const Settings = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <div className="flex justify-between items-center">
          <label htmlFor="darkMode" className="font-medium">Enable Dark Mode</label>
          <input type="checkbox" id="darkMode" className="toggle toggle-sm" />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="maintenance" className="font-medium">Maintenance Mode</label>
          <input type="checkbox" id="maintenance" className="toggle toggle-sm" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
