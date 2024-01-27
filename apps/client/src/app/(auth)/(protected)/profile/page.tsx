"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mobile } from "@/components";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user/useUserCTX";
import appwriteDB from "@/appwrite-service/appwriteDB";

interface CardItem {
  // linkName: string;
  linkURL: string;
  editing: boolean;
}

const Profile: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [platform, setPlatform] = useState([]);
  const [uid, setUid] = useState<string>("");

  const user = useUser();

  const addCard = () => {
    const newCard: CardItem = {
      // linkName: "",
      linkURL: "",
      editing: true,
    };
    setCards([...cards, newCard]);
  };

  const handleLinkURLChange = (index: number, event: any) => {
    const updatedCards: any = [...cards];
    updatedCards[index].linkURL = event.target.value;
    setCards(updatedCards);
  };

  const handleSave = (index: number) => {
    const updatedCards: any = [...cards];
    updatedCards[index].editing = false;
    setCards(updatedCards);
  };

  const handleDelete = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const pushToDB = () => {
    const dbLinkUrl: string[] = [];
    cards.map((card) => {
      dbLinkUrl.push(card.linkURL);
    });
    appwriteDB
      .create({
        uid: "Test1",
        platform: platform,
        url: dbLinkUrl,
        name: "Aditya Singh",
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    user.getUser().then((res: any) => {
      setUid(res.uid);
    });

    // appwriteDB
    //   .create({
    //     uid: "123",
    //     platform: ["X", "Y", "Z", "asd"],
    //     url: [
    //       "https://x.com/",
    //       "https://y.com/",
    //       "https://z.com/",
    //       "https://asd.com/",
    //     ],
    //     name: "Aditya Singh",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, []);

  return (
    <div className="h-[100vh] flex justify-center p-4">
      <div className="w-[70%]">
        <Button
          className="bg-blue-500 hover:text-blue-600"
          // variant="contained"
          onClick={addCard}>
          Add link
        </Button>
        <div className="max-h-[90vh] overflow-y-auto scrollbar-hidden">
        <div className="mt-4">
          {cards.map((card, index) => (
            <div key={index} className="my-4">
              {card.editing ? (
                <Card id={index.toString()} className="w-[300px] md:w-[950px]">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Add Link</Label>
                          <Input
                            id="name"
                            value={card.linkURL}
                            onChange={(event) =>
                              handleLinkURLChange(index, event)
                            }
                            placeholder="Paste Link here"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="platform">Platform</Label>
                          <Select
                            value={platform[index]}
                            onValueChange={(e) => {
                              setPlatform((prev) => {
                                const updatedCards: any = [...prev];
                                updatedCards[index] = e.valueOf();
                                return updatedCards;
                              });
                            }}>
                            <SelectTrigger id="platform">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="GitHub">GitHub</SelectItem>
                              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                              <SelectItem value="Instagram">
                                Instagram
                              </SelectItem>
                              <SelectItem value="X">X</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={() => handleSave(index)}>Save</Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card id={index.toString()} className="w-[300px] md:w-[950px]">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">{card.linkURL}</Label>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">{platform[index]}</Label>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="outline">
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        const updatedCards: any = [...cards];
                        updatedCards[index].editing = true;
                        setCards(updatedCards);
                      }}>
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-[30%]">
        <Mobile cards={cards} platform={platform} />
      </div>
      <button onClick={pushToDB}>ADDD</button>
    </div>
  );
};

export default Profile;
