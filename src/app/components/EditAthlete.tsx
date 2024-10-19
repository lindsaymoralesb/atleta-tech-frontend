"use client";

import { useEffect, useState } from "react";
import { latamCountries, sports } from "../utils/catalogs";
import Navbar from "./Navbar";
import { Plus, TriangleAlert } from "lucide-react";
import { useContract } from "../hooks/useContract";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { useReadContract } from "thirdweb/react";

export default function EditAthlete() {
  const { contract, address, handleUpdateProfile, handleLinkNFTCollection } =
    useContract();
  const [loadingRequestProfile, setLoadingRequestProfile] = useState(false);
  const [loadingRequestNFTs, setLoadingRequestNFTs] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useReadContract({
    contract,
    method:
      "function getProfile(address _athlete) view returns (string name, string sport, string country, string bio, string[] nftCollections, uint256 createdAt)",
    params: [address],
  });

  const [profileData, setProfileData] = useState({
    name: data?.[0],
    sport: data?.[1],
    country: data?.[2],
    bio: data?.[3],
  });

  const [nftCollections, setNftCollections] = useState(data?.[4]);

  useEffect(() => {
    setProfileData({
      name: data?.[0],
      sport: data?.[1],
      country: data?.[2],
      bio: data?.[3],
    });
    setNftCollections(data?.[4]);
  }, [data]);

  const handleProfileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNftChange = (index: number, value: string) => {
    if (nftCollections) {
      const newNftCollections = [...nftCollections];
      newNftCollections[index] = value;
      setNftCollections(newNftCollections);
    }
  };

  const addNftField = () => {
    setNftCollections((prev) => (prev ? [...prev, ""] : [""]));
  };

  const handleUpdateProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      setLoadingRequestProfile(true);
      const result = await handleUpdateProfile(
        profileData.name ?? "",
        profileData.sport ?? "",
        profileData.country ?? "",
        profileData.bio ?? ""
      );
      if (result.success) {
        setOpenSnackbar(true);
        setError(null);
      } else {
        setError("Ha ocurrido un error. Por favor intenta de nuevo!");
        console.error("Error updating profile:", result.error);
      }
    } catch (error) {
      setError("Ha ocurrido un error. Por favor intenta de nuevo!");
      console.error("Error updating profile:", error);
    } finally {
      setLoadingRequestProfile(false);
    }
  };

  const handleNftSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      setLoadingRequestNFTs(true);
      if (nftCollections) {
        for (const collection of nftCollections) {
          if (collection) {
            const result = await handleLinkNFTCollection(collection);
            if (!result.success) {
              throw new Error(`Failed to link NFT collection: ${collection}`);
            }
          }
        }
      }
      setOpenSnackbar(true);
      setError(null);
    } catch (error) {
      setError("Ha ocurrido un error. Por favor intenta de nuevo!");
      console.error("Error linking NFT collections:", error);
    } finally {
      setLoadingRequestNFTs(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9]">
      <Navbar />
      {address ? (
        isLoading ? (
          <div className="relative px-2 py-10 w-full flex items-center justify-center h-full text-bold text-2xl">
            Cargando...
          </div>
        ) : (
          profileData.name !== undefined && (
            <div className="relative flex flex-col items-center">
              <div className="relative px-2 py-10 bg-white shadow-lg w-full">
                <div className="max-w-[80%] mx-auto">
                  <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800 uppercase">
                    Actualiza tu perfil de atleta
                  </h1>
                  <form
                    onSubmit={handleUpdateProfileSubmit}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                        placeholder="Nombre"
                        value={profileData.name}
                        onChange={handleProfileChange}
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
                        value={profileData.sport}
                        onChange={handleProfileChange}
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
                        value={profileData.country}
                        onChange={handleProfileChange}
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
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        required
                      ></textarea>
                      <label
                        htmlFor="bio"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Tu historia
                      </label>
                    </div>
                    <div className="pt-6 text-center flex justify-center">
                      <button
                        onClick={handleUpdateProfileSubmit}
                        type="button"
                        className={`bg-white text-blue-800 rounded-md px-6 py-2 hover:bg-blue-800 hover:text-white transition duration-300 flex justify-center ${
                          !loadingRequestProfile
                            ? "border-2 border-solid border-blue-800"
                            : ""
                        }`}
                        disabled={loadingRequestNFTs || loadingRequestProfile}
                      >
                        {loadingRequestProfile ? (
                          <CircularProgress size={30} />
                        ) : (
                          "Actualizar perfil"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="relative px-2 py-10 bg-white shadow-lg w-full pb-12">
                <div className="max-w-[80%] mx-auto">
                  <h1 className="text-3xl font-semibold text-center mb-6 text-blue-800 uppercase">
                    Administrar colecciones NFT
                  </h1>
                  <form onSubmit={handleNftSubmit} className="space-y-6">
                    {nftCollections?.map((collection, index) => (
                      <div key={index} className="relative">
                        <input
                          type="text"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                          placeholder="Link de colección NFT"
                          value={collection}
                          onChange={(e) =>
                            handleNftChange(index, e.target.value)
                          }
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
                        onClick={handleNftSubmit}
                        type="button"
                        className={`bg-white text-blue-800 rounded-md px-6 py-2 hover:bg-blue-800 hover:text-white transition duration-300 flex justify-center ${
                          !loadingRequestNFTs
                            ? "border-2 border-solid border-blue-800"
                            : ""
                        }`}
                        disabled={loadingRequestNFTs || loadingRequestProfile}
                      >
                        {loadingRequestNFTs ? (
                          <CircularProgress size={30} />
                        ) : (
                          "Actualizar colecciones NFT"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )
        )
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
        message={error ?? "Perfil actualizado con éxito!"}
        action={action}
      />
    </div>
  );
}
