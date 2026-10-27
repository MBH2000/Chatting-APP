import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppSelector } from "@/Controllers/hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    name: z.string().min(6).max(20),
    email: z.string().email(),
    profilePic: z.any()
});

export const ProfileEdit = () => {
    const user = useAppSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            profilePic: user.avatar
        }
    });

    const onSubmit = (data:any) => {
        // You can perform actions like sending data to API here
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-flow-col gap-4 items-center">
            <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                    <AvatarImage src={`${user.avatar}`} />
                    <AvatarFallback className="w-32 h-32">{user.name[0]}</AvatarFallback>
                </Avatar>
                <Input
                    id='picture'
                    type='file'
                    {...register("profilePic")}
                    multiple={false} // Allow only one file
                />
            </div>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="col-span-3"
                    />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};
