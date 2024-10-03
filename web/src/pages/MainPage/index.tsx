import { Button, Text } from "@fluentui/react-components";
import { Header } from "../../components/Header";
import { useState } from "react";
import { set } from "idb-keyval";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "./components/AlertMessage";

export const MainPage = () => {
  const navigate = useNavigate();

  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalLines, setTotalLines] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  const downloadFile = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:4500/download");

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const totalLinesHeader = response.headers.get("X-Lines-Count");
      setTotalLines(totalLinesHeader ? Number(totalLinesHeader) : 0);

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
      }}
    >
      <Header />
      <div
        style={{
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
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
        {totalLines && <Text>Total lines: {totalLines}</Text>}
        {error && (
          <AlertMessage intent="error" message={error} header="Error" />
        )}
        {downloaded && (
          <AlertMessage
            intent="success"
            message="File successfully cached"
            header="Success"
            actionTitle="Open table"
            action={() =>
              navigate("/data-table", { state: { totalLines: totalLines } })
            }
          />
        )}
      </div>
    </div>
  );
};
