import { useState } from "react";
import { FormattedMessage } from "react-intl";

import useEventPublisher from "@/Hooks/useEventPublisher";
import useLogin from "@/Hooks/useLogin";
import { appendDedupe } from "@/Utils";
import { SnortAppData, updateAppData } from "@/Utils/Login";

export default function ModerationSettingsPage() {
  const login = useLogin();
  const [muteWord, setMuteWord] = useState("");
  const appData = login.appData.json;
  const { system } = useEventPublisher();

  function addMutedWord() {
    updateAppData(login.id, system, ad => ({
      ...ad,
      mutedWords: appendDedupe(appData.mutedWords, [muteWord]),
    }));
    setMuteWord("");
  }

  const handleToggle = (setting: keyof SnortAppData) => {
    updateAppData(login.id, system, ad => ({
      ...ad,
      [setting]: !appData[setting],
    }));
  };

  function removeMutedWord(word: string) {
    updateAppData(login.id, system, ad => ({
      ...ad,
      mutedWords: appData.mutedWords.filter(a => a !== word),
    }));
    setMuteWord("");
  }

  return (
    <>
      <h2>
        <FormattedMessage defaultMessage="Moderation" id="wofVHy" />
      </h2>

      <div className="py-4 flex flex-col gap-2">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={appData.showContentWarningPosts}
            onChange={() => handleToggle("showContentWarningPosts")}
            className="mr-2"
            id="showContentWarningPosts"
          />
          <label htmlFor="showContentWarningPosts">
            <FormattedMessage defaultMessage="Show posts that have a content warning tag" id="fQN+tq" />
          </label>
        </div>
      </div>

      <h3>
        <FormattedMessage defaultMessage="Muted Words" id="AN0Z7Q" />
      </h3>
      <div className="flex flex-col g12">
        <div className="flex g8">
          <input
            type="text"
            placeholder="eg. crypto"
            className="w-max"
            value={muteWord}
            onChange={e => setMuteWord(e.target.value.toLowerCase())}
          />
          <button type="button" onClick={addMutedWord}>
            <FormattedMessage defaultMessage="Add" id="2/2yg+" />
          </button>
        </div>
        {appData.mutedWords.map(v => (
          <div key={v} className="p br b flex items-center justify-between">
            <div>{v}</div>
            <button type="button" onClick={() => removeMutedWord(v)}>
              <FormattedMessage defaultMessage="Delete" id="K3r6DQ" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
