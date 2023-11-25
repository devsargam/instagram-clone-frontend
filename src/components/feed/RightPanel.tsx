import { useSuggestedPeople } from '@/hooks/feed/useSuggestedPeople';
import { Button } from '../common';
import { SuggestedPerson } from '../common/SuggestedPerson';
import { ISuggestedUser } from '@/interfaces';

export function RightPanel() {
  const { suggestedUsers } = useSuggestedPeople();

  return (
    <section className="w-[22rem] hidden lg:block space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 cursor-pointer">
            <img
              className="w-full"
              alt="sargam"
              src="https://sargams-bucket.s3.eu-north-1.amazonaws.com/dd2f9f7a-2289-445e-9bee-fad7095e403a.png"
            />
          </div>
          <div>
            <h2 className="font-semibold text-md">sargam</h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-semibold opacity-50">Suggestions For You</h1>
        <Button blacked>See All</Button>
      </div>

      <div className="space-y-4">
        {suggestedUsers.map((user: ISuggestedUser) => (
          <SuggestedPerson key={user.id} person={user} />
        ))}
      </div>
    </section>
  );
}
