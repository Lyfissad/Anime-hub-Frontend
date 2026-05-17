import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsAdult } from "@/Context/isAdultContext";



export default function IsAdult(){
    const {isAdult, setIsAdult} = useIsAdult()
    return(
        <ToggleGroup type = "single" value = {isAdult} defaultValue = "sfw" variant = "outline" className={`rounded-2xl`} onValueChange = {(value) => {if (value) setIsAdult(value)}} >
                                <ToggleGroupItem className = {`min-w-15 border transition-all ease-in-out duration-300 cursor-pointer border-vibeBlack bg-vibeBlack
                                        text-text-pri
                                        hover:bg-vibeBlack hover:text-crimAccent data-[state=on]:text-lg
                                        data-[state=on]:bg-crimAccent data-[state=on]:text-vibeBlack`} value = "all"
                                        >
                                            ALL
                                        
                                </ToggleGroupItem>

                                <ToggleGroupItem className = {`min-w-15 border transition-all ease-in-out duration-300 cursor-pointer border-vibeBlack bg-vibeBlack
                                        text-text-pri
                                        hover:bg-vibeBlack hover:text-crimAccent data-[state=on]:text-lg
                                        data-[state=on]:bg-crimAccent data-[state=on]:text-vibeBlack`} value = "sfw">
                                            
                                            SFW
                                            
                                            </ToggleGroupItem>
                                <ToggleGroupItem className = {`min-w-15 border transition-all ease-in-out duration-300 cursor-pointer border-vibeBlack bg-vibeBlack
                                        text-text-pri
                                        hover:bg-vibeBlack hover:text-crimAccent data-[state=on]:text-lg
                                        data-[state=on]:bg-crimAccent data-[state=on]:text-vibeBlack`} value = "nsfw">
                                            
                                            NSFW
                                            
                                </ToggleGroupItem>
        </ToggleGroup>
    )
}