import apiUrl from "./ApiConfig";

const ChangeUplodeB = (file, onSuccess, onError) => {
    let formData = new FormData();
    formData.append("File", file);
    formData.append("Name", "");
    formData.append("Description", "");
    formData.append("IsPrivate", false);
  
    const uploadFile = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
          method: "POST",
          body: formData,
        });
  
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
  
        const result = await res.json();
  
        if (result && result.adress) {
          // فراخوانی تابع موفقیت با ID تصویر
          onSuccess(result.adress);
        } else {
          // اگر ID موجود نباشد، فراخوانی تابع خطا
          onError('No ID returned from server.');
        }
      } catch (err) {
        console.error('Upload error:', err);
        // فراخوانی تابع خطا
        onError(err.message);
      }
    };
  
    uploadFile();
  };
  
  export default ChangeUplodeB;
  