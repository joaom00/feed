import { EditIcon } from '../icons/EditIcon';
import { IgniteIcon } from '../icons/Ignite';

const Home = () => {
  return (
    <>
      <header className="bg-gray-2 py-5 flex justify-center items-center">
        <p className="text-2xl font-bold text-gray-7 flex items-center gap-4">
          <IgniteIcon />
          Ignite Feed
        </p>
      </header>
      <main className="mt-8 max-w-[1120px] w-full mx-auto grid grid-cols-main gap-8 pb-20">
        <aside className="bg-gray-2 rounded-lg grid grid-rows-profile overflow-hidden text-center h-max">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1661336581000-b0c41a876950?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
            alt="Capa de perfil de João Pedro"
          />
          <div className="w-[60px] h-[60px] rounded-lg bg-gray-2 border-2 border-brand-green-light flex justify-center items-center mx-auto -mt-[30px]">
            <img
              className="w-[49px] h-[49px] rounded-[5px]"
              src="https://github.com/joaom00.png"
              alt="Foto de perfil de João Pedro"
            />
          </div>
          <p className="font-bold mt-4">João Pedro</p>
          <p className="text-sm text-gray-5">Front-End Developer</p>
          <div className="pt-6 pb-8 border-t border-gray-3 mt-6">
            <button className="bg-transparent pt-4 pb-[14px] px-6 font-bold text-brand-green-light inline-flex justify-center items-center gap-[10px] rounded-lg border border-brand-green-light leading-none">
              <EditIcon />
              Editar seu perfil
            </button>
          </div>
        </aside>
        <div className="space-y-8">
          <div className="bg-gray-2 rounded-lg p-10">
            <div className="grid grid-cols-[60px_1fr] gap-4">
              <div className="w-[60px] h-[60px] rounded-lg bg-gray-2 border-2 border-brand-green-light flex justify-center items-center">
                <img
                  className="w-[49px] h-[49px] rounded-[5px]"
                  src="https://github.com/joaom00.png"
                  alt="Foto de perfil de João Pedro"
                />
              </div>

              <textarea
                className="w-full rounded-lg bg-gray-1 px-4 py-[13px] placeholder:text-gray-4 text-gray-6 min-h-[96px] focus:outline-none focus:outline-brand-green-light"
                placeholder="Escreva um comentário..."
              />
              <button className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none mt-4 col-start-2 w-max">
                Publicar
              </button>
            </div>
          </div>
          <div className="bg-gray-2 rounded-lg p-10">
            <div className="grid grid-cols-[60px_1fr_auto] gap-4 items-center">
              <div className="w-[60px] h-[60px] rounded-lg bg-gray-2 border-2 border-brand-green-light flex justify-center items-center">
                <img
                  className="w-[49px] h-[49px] rounded-[5px]"
                  src="https://github.com/joaom00.png"
                  alt="Foto de perfil de João Pedro"
                />
              </div>

              <div>
                <p className="font-bold">Jane Cooper</p>
                <p className="text-sm text-gray-5">Dev Front-End</p>
              </div>

              <span className="text-sm text-gray-5">Públicado há 1h</span>
            </div>

            <p className="whitespace-pre-wrap max-w-[75ch] mt-6">
              Fala galeraa 👋
              <br />
              <br />
              Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return,
              evento da Rocketseat. O nome do projeto é DoctorCare 🚀
              <br />
              <br />
              👉 jane.design/doctorcare
              <br />
              <br />
              #novoprojeto #nlw #rocketseat 
            </p>
            <div className="mt-6 pt-6 border-t border-gray-3">
              <p className="font-bold mb-4">Deixe seu feedback</p>
              <textarea
                className="w-full rounded-lg bg-gray-1 px-4 py-[13px] placeholder:text-gray-4 text-gray-6 min-h-[96px] focus:outline-none focus:outline-brand-green-light"
                placeholder="Escreva um comentário..."
              />
              <button className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none mt-4">
                Publicar
              </button>
            </div>
          </div>

          <div className="bg-gray-2 rounded-lg p-10">
            <div className="grid grid-cols-[60px_1fr_auto] gap-4 items-center">
              <div className="w-[60px] h-[60px] rounded-lg bg-gray-2 border-2 border-brand-green-light flex justify-center items-center">
                <img
                  className="w-[49px] h-[49px] rounded-[5px]"
                  src="https://github.com/joaom00.png"
                  alt="Foto de perfil de João Pedro"
                />
              </div>

              <div>
                <p className="font-bold">Jane Cooper</p>
                <p className="text-sm text-gray-5">Dev Front-End</p>
              </div>

              <span className="text-sm text-gray-5">Públicado há 1h</span>
            </div>

            <p className="whitespace-pre-wrap max-w-[75ch] mt-6">
              Fala galeraa 👋
              <br />
              <br />
              Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return,
              evento da Rocketseat. O nome do projeto é DoctorCare 🚀
              <br />
              <br />
              👉 jane.design/doctorcare
              <br />
              <br />
              #novoprojeto #nlw #rocketseat 
            </p>
            <div className="mt-6 pt-6 border-t border-gray-3">
              <p className="font-bold mb-4">Deixe seu feedback</p>
              <textarea
                className="w-full rounded-lg bg-gray-1 px-4 py-[13px] placeholder:text-gray-4 text-gray-6 min-h-[96px] focus:outline-none focus:outline-brand-green-light"
                placeholder="Escreva um comentário..."
              />
              <button className="bg-brand-green pt-4 pb-[14px] px-6 font-bold text-white inline-flex justify-center items-center gap-[10px] rounded-lg leading-none mt-4">
                Publicar
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
