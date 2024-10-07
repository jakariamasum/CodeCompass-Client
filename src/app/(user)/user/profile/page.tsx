"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import { FaEdit, FaCheckCircle, FaUserMinus } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui/components";
import { useUser } from "@/context/user.provider";
import { useUserPosts } from "@/hooks/post.hook";
import { IPost } from "@/types";
import moment from "moment";
import { BiCalendar, BiComment, BiLike } from "react-icons/bi";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();
  const { data: posts } = useUserPosts(user?._id as string);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.fname,
      email: user?.email,
      bio: "Happy Coding",
    },
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    reset();
  };

  const onSubmit = (data: any) => {
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-slate-50 max-w-full sm:max-w-3xl mx-auto">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.profilePic} alt="Profile Picture" />
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                <span>
                  {user?.fname} <span> </span>
                  {user?.lname}
                </span>
                {user?.verified && (
                  <FaCheckCircle
                    className="text-primary"
                    title="Verified User"
                  />
                )}
              </CardTitle>
              <p className="text-muted-foreground">{}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleEditToggle}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <FaEdit className="mr-2" /> Edit Profile
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          {!user?.verified && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-5">
              <p>
                Your account is not verified.{" "}
                <Button variant="link" className="p-0 h-auto font-normal">
                  Verify Now
                </Button>
              </p>
            </div>
          )}

          {isEditing && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name", { required: true })} />
                {errors.name && (
                  <span className="text-destructive text-sm">
                    Name is required
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" {...register("bio")} />
              </div>
              <Button type="submit">Save</Button>
            </form>
          )}

          <Tabs>
            <TabList className="flex flex-wrap space-x-0 sm:space-x-2 border-b mb-4 overflow-x-auto">
              <Tab className="px-4 py-2 cursor-pointer text-sm sm:text-base focus:outline-none border-b-2 border-transparent ui-selected:border-primary ui-selected:text-primary">
                Posts
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer text-sm sm:text-base focus:outline-none border-b-2 border-transparent ui-selected:border-primary ui-selected:text-primary">
                Following
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer text-sm sm:text-base focus:outline-none border-b-2 border-transparent ui-selected:border-primary ui-selected:text-primary">
                Followers
              </Tab>
            </TabList>

            <TabPanel>
              <h3 className="text-xl font-semibold mb-4">My Posts</h3>
              {posts?.length > 0 ? (
                <div className="space-y-4">
                  {posts?.map((post: IPost, index: number) => (
                    <Card key={index}>
                      <CardContent className="flex justify-between items-center p-4">
                        <div>
                          <h4 className="text-lg font-bold">{post.title}</h4>
                          <p className="flex gap-x-1 items-center">
                            <BiCalendar size={18} className="text-[#009CA6]" />{" "}
                            <span>
                              {" "}
                              :{moment(post?.createdAt).format("MMMM Do YYYY")}
                            </span>
                          </p>
                          <div className="flex space-x-2 text-muted-foreground">
                            <span className="flex gap-x-1 items-center">
                              <BiLike size={18} className="text-[#009CA6]" />{" "}
                              <span>: {post?.likes}</span>
                            </span>
                            <span className="flex gap-x-1 items-center">
                              <BiComment size={18} className="text-[#009CA6]" />
                              <span>: {10}</span>
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <MdOutlinePostAdd className="text-5xl mx-auto mb-3" />
                  <p>No posts yet.</p>
                </div>
              )}
            </TabPanel>

            <TabPanel>
              <h3 className="text-xl font-semibold mb-4">Following</h3>
              <div className="space-y-4">
                {user?.following?.map((follow, index) => (
                  <Card key={index}>
                    <CardContent className="flex justify-between items-center p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={""} alt={""} />
                          <AvatarFallback>{"A"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{""}</h4>
                          <p className="text-sm text-muted-foreground">{""}</p>
                        </div>
                      </div>
                      <Button variant="outline">
                        <FaUserMinus className="mr-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabPanel>

            <TabPanel>
              <h3 className="text-xl font-semibold mb-4">Followers</h3>
              <div className="space-y-4">
                {user?.followers?.map((follower, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-center space-x-4 p-4">
                      <Avatar>
                        <AvatarImage src={""} alt={""} />
                        <AvatarFallback>{"F"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{""}</h4>
                        <p className="text-sm text-muted-foreground">{""}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
