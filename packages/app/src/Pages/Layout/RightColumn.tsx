import SearchBox from "@/Element/SearchBox";
import TrendingUsers from "@/Element/TrendingUsers";
import TrendingHashtags from "@/Element/TrendingHashtags";
import TrendingNotes from "@/Element/TrendingPosts";
import { FormattedMessage } from "react-intl";

export default function RightColumn() {
  return (
    <div className="flex-col hidden lg:flex lg:w-1/3 h-screen p-2 border-l border-neutral-900 gap-8">
      <div className="sticky top-0">
        <SearchBox />
      </div>
      <div className="overflow-y-auto flex-grow">
        <div>
          <div className="font-bold">
            <FormattedMessage defaultMessage="Trending hashtags" id="CbM2hK" />
          </div>
          <TrendingHashtags count={5} />
        </div>
        <div>
          <div className="font-bold">
            <FormattedMessage defaultMessage="Trending notes" id="6k7xfM" />
          </div>
          <TrendingNotes count={5} />
        </div>
        <div>
          <div className="font-bold">
            <FormattedMessage defaultMessage="Trending users" id="arZnG2" />
          </div>
          <TrendingUsers count={5} />
        </div>
      </div>
    </div>
  );
}
