import { Button, Text } from "@fluentui/react-components";
import { Header } from "../../components/Header";
import { useState } from "react";
import { set } from "idb-keyval";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const downloadFile = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:4500/download");

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const totalLinesHeader = response.headers.get("X-LINES-COUNT");
      const totalLines = totalLinesHeader
        ? parseInt(totalLinesHeader, 10)
        : null;

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let fileContent = "";

      while (true) {
        const { done, value } = (await reader?.read()) ?? {
          done: true,
          value: null,
        };

        if (done || !value) {
          break;
        }

        fileContent += decoder.decode(value, { stream: true });
      }

      await set("cachedFile", fileContent);

      setDownloaded(true);
      navigate("/data-table", {
        state: { totalCount: totalLines },
      });
    } catch (err) {
      console.error("Error downloading file:", err);
      setError("Failed to download the file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      <Button
        appearance="primary"
        onClick={downloadFile}
        disabled={downloaded || loading}
      >
        {loading
          ? `Downloading...`
          : downloaded
          ? "File Cached"
          : "Download and Cache File"}
      </Button>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </div>
  );
};
