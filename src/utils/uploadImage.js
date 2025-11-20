import Resizer from "react-image-file-resizer";

/**
 * Comprime una imagen y la sube a ImgBB.
 * @param {File} file - El archivo de imagen seleccionado por el usuario.
 * @returns {Promise<string>} - Retorna la URL de la imagen subida o lanza un error.
 */
export const uploadImage = async (file) => {
  // 1. Validar que exista el API KEY
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("Falta la variable de entorno VITE_IMGBB_API_KEY");
  }

  // 2. Función auxiliar para redimensionar (promisificada)
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200, // Ancho máximo
        1200, // Alto máximo
        "WEBP", // Formato de salida (mejor que JPEG/PNG para web)
        90, // Calidad (0-100)
        0, // Rotación
        (uri) => {
          resolve(uri);
        },
        "blob" // Salida como BLOB para poder subirla
      );
    });

  try {
    // 3. Comprimir la imagen
    const imageBlob = await resizeFile(file);

    // 4. Preparar el form-data para ImgBB
    const formData = new FormData();
    formData.append("image", imageBlob);

    // 5. Enviar a ImgBB
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      // Retornamos la URL lista para guardar en tu BD
      return data.data.url; 
    } else {
      throw new Error(data.error?.message || "Error al subir la imagen");
    }
  } catch (error) {
    console.error("Error en uploadImage:", error);
    throw error;
  }
};