import Resizer from "react-image-file-resizer";

/**
 * Comprime una imagen y la sube a ImgBB.
 * @param {File} file - El archivo de imagen seleccionado por el usuario.
 * @returns {Promise<string>} - Retorna la URL de la imagen subida o lanza un error.
 */
export const uploadImage = async (file) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("Falta la variable de entorno VITE_IMGBB_API_KEY");
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200, // Ancho 
        1200, // Alto 
        "WEBP", // Formato de salida 
        90, // Calidad (0-100)
        0, // Rotacion
        (uri) => {
          resolve(uri);
        },
        "blob" 
      );
    });

  try {
    // Comprimir la imagen
    const imageBlob = await resizeFile(file);

    const formData = new FormData();
    formData.append("image", imageBlob);

    // Enviar a ImgBB
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      // Retorna la URL para la BD
      return data.data.url; 
    } else {
      throw new Error(data.error?.message || "Error al subir la imagen");
    }
  } catch (error) {
    console.error("Error en uploadImage:", error);
    throw error;
  }
};