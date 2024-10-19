"use client";

import { useState } from "react";
import { latamCountries, sports } from "../utils/catalogs";
import Navbar from "./Navbar";
import { Plus, TriangleAlert } from "lucide-react";
import { useContract } from "../hooks/useContract";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

export default function CreateAthlete() {
  const router = useRouter();
  const { address, handleCreateProfile } =
    useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    country: "",
    bio: "",
    nftCollections: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNftChange = (index: number, value: string) => {
    const newNftCollections = [...formData.nftCollections];
    newNftCollections[index] = value;
    setFormData((prev) => ({ ...prev, nftCollections: newNftCollections }));
  };

  const addNftField = () => {
    setFormData((prev) => ({
      ...prev,
      nftCollections: [...prev.nftCollections, ""],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      setIsLoading(true);
      const result = await handleCreateProfile(
        formData.name,
        formData.sport,
        formData.country,
        formData.bio,
        formData.nftCollections
      );
      if (result.success) {
        router.push(`/athlete/view/${address}`);
      } else {
        setError("Ha ocurrido un error. Intenta de nuevo!");
        console.error("Error creating profile:", result.error);
      }
    } catch (error) {
      setError("Ha ocurrido un error. Intenta de nuevo!");
      console.error("Error creating profile:", error);
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] flex flex-col">
      <Navbar />
      {address ? (
        <div className="relative flex justify-center flex-1">
          <div className="relative px-2 py-10 bg-white w-full">
            <div className="max-w-[80%] mx-auto mt-12">
              <div>
                <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800 uppercase">
                  Crea tu perfil de atleta
                </h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Nombre
                  </label>
                </div>
                <div className="relative">
                  <select
                    id="sport"
                    name="sport"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    value={formData.sport}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un deporte</option>
                    {sports.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="sport"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm"
                  >
                    Deporte
                  </label>
                </div>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un país</option>
                    {latamCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="country"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm"
                  >
                    País
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="bio"
                    name="bio"
                    className="peer placeholder-transparent h-20 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 resize-none"
                    placeholder="Tu historia"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label
                    htmlFor="bio"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Tu historia
                  </label>
                </div>
                {formData.nftCollections.map((collection, index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Link de colección NFT"
                      value={collection}
                      onChange={(e) => handleNftChange(index, e.target.value)}
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Link de colección NFT
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNftField}
                  className="mt-2 bg-white text-blue-800 rounded-md px-0 hover:text-blue-600 transition duration-300 flex flex-row gap-2"
                >
                  <Plus className="w-6 h-6 text-blue-800 hover:text-blue-600" />
                  Añadir otra colección NFT
                </button>
                <div className="pt-6 text-center flex justify-center">
                  <button
                    type="submit"
                    className={`bg-white text-blue-800 rounded-md px-6 py-2 hover:bg-blue-800 hover:text-white transition duration-300 flex justify-center ${
                      !isLoading ? "border-2 border-solid border-blue-800" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={30} />
                    ) : (
                      "Crear perfil"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative sm:w-[60%] sm:mx-auto flex justify-center">
          <div className="relative px-2 py-10 w-full mt-[100px]">
            <div className="flex flex-col gap-10 items-center justify-center">
              <TriangleAlert className="w-20 h-20 text-white" />
              <h1 className="text-3xl font-semibold text-center mb-6 text-white">
                Debes iniciar sesión primero
              </h1>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error ?? "Perfil creado con éxito!"}
        action={action}
      />
    </div>
  );
}
