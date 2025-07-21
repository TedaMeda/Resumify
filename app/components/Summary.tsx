import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge"
const Catagory = ({title, score}:{title:string, score:number})=>{
    const textColor = score>70 ? 'text-green-600': 
                        score>49 ? 'text-yellow-600' :
                        'text-red-600';
    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-md">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <div className="text-md">
                    <span className={textColor}>{score}</span>/100
                </div>
            </div> 
             
        </div>
    )
}
export const Summary = ({feedback}:{feedback: Feedback})=>{
    return(
        <div className="bg-white rounded-2xl shadow-md w-full p-4">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore}/>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your resume score</h2>
                    <p className="text-sm text-gray-500">This is calculated based on the variables listed below</p>
                </div>
            </div>
                <Catagory title="Tone & Style" score={feedback.toneAndStyle.score}/>
                <Catagory title="Content" score={feedback.content.score}/>
                <Catagory title="Structure" score={feedback.structure.score}/>
                <Catagory title="Skills" score={feedback.skills.score}/>
        </div>
    )
}