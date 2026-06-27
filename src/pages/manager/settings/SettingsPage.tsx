import ButtonComponent from '../../../components/ui/ButtonComponent';
import { InputComponent} from '../../../components/ui/form/InputComponent';

const SettingsPage = () => {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Settings
                </h2>
            </div>

            <form className="space-y-6">

                <div className="rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                        <tbody>

                        {/* ROW 1 */}
                        <tr className="border-t border-white/10">
                            <td className="p-4 w-1/3 text-slate-300">
                                Site Name
                            </td>
                            <td className="p-4">
                                <InputComponent type="text" />
                            </td>
                        </tr>

                        {/* ROW 2 */}
                        <tr className="border-t border-white/10">
                            <td className="p-4 w-1/3 text-slate-300">
                                Lifetime Token
                            </td>
                            <td className="p-4">
                                <InputComponent type="text" />
                            </td>
                        </tr>

                        {/* ROW 3 */}
                        <tr className="border-t border-white/10">
                            <td className="p-4 w-1/3 text-slate-300">
                                Default Role
                            </td>
                            <td className="p-4">
                                <InputComponent type="text" />
                            </td>
                        </tr>

                        </tbody>

                    </table>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <ButtonComponent type={'inverse_info'}>Save Settings</ButtonComponent>
                </div>

            </form>
        </>
    );
};

export default SettingsPage;