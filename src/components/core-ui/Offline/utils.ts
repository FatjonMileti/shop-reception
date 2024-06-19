import { useEffect, useState } from "react";

export const toDataURL = (url: string) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

function dataURLtoBlob(dataURL: string): Blob {
  const parts = dataURL.split(",");
  const contentType = parts[0].split(";")[1].split("=")[1];
  const decodedData = atob(parts[1]);

  // Use TextEncoder for a more robust approach
  const byteArray = new TextEncoder().encode(decodedData);

  const blob = new Blob([byteArray], { type: contentType });
  return blob;
}

export async function formDataToJSON(
  formData: FormData
): Promise<{ [key: string]: string | object }> {
  const data: { [key: string]: string | object } = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof Blob) {
      const dataURL = await blobToDataURL(value);
      data[key] = { type: value.type, dataURL }; // Include dataURL representation
    } else {
      data[key] = value;
    }
  }

  return data;
}

export function jsonToFormData(data: object): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object" && "type" in value && "dataURL" in value) {
      // Assume object represents a Blob with dataURL
      const blob = dataURLtoBlob(value.dataURL as string);
      formData.append(key, blob, value.type as string); // Include retrieved type
    } else {
      formData.append(key, value.toString());
    }
  }

  return formData;
}

interface IsOnlineValues {
  isOffline: boolean;
  isOnline: boolean;
}

export const useIsOnline = (): IsOnlineValues => {
  const [isOnline, setOnlineStatus] = useState(window.navigator.onLine);

  useEffect(() => {
    const toggleOnlineStatus = () => setOnlineStatus(window.navigator.onLine);

    window.addEventListener("online", toggleOnlineStatus);
    window.addEventListener("offline", toggleOnlineStatus);

    return () => {
      window.removeEventListener("online", toggleOnlineStatus);
      window.removeEventListener("offline", toggleOnlineStatus);
    };
  }, [isOnline]);

  return {
    isOffline: !isOnline,
    isOnline,
  };
};

export function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const arrayBuffer = event.target.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        // Create a new Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: file.type });

        resolve(blob);
      } else {
        reject(new Error("FileReader error"));
      }
    };

    reader.onerror = () => {
      reject(new Error("FileReader error"));
    };

    reader.readAsArrayBuffer(file);
  });
}

export async function formDataToJsonData(
  formData: FormData
): Promise<{ [key: string]: object | string | number | boolean }> {
  const data: { [key: string]: object | string | number | boolean } = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      data[key] = await fileToBlob(value); // Blob
    } else {
      data[key] = value;
    }
  }

  return data;
}

export const objectToFormData = (data: object) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }
  return formData;
};
