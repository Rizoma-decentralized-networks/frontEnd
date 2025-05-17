import React from "react";

const PostMarkSection = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Publicar</h2>
          <p>
            Publica tu idea, propuesta o iniciativa para que la comunidad la
            pueda ver y apoyar.
          </p>

          <input type="file" className="file-input file-input-secondary" />

          <input
            type="text"
            placeholder="¿Qué idea quieres compartir?"
            className="input input-secondary"
          />

          <textarea
            className="textarea textarea-secondary"
            placeholder="¿Cuál es la idea?"
          ></textarea>

         
        </div>
      </div>
    </div>
  );
};

export default PostMarkSection;
