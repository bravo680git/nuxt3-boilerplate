import fs from 'fs';
import { resolve } from 'pathe';

export type GenerateModules = () => string[];

export const generateModules: GenerateModules = () => {
  const modules: string[] = [];
  const modulePath = resolve('modules');

  const detectModules = (_path: string) => {
    fs.readdirSync(_path).forEach((_dir) => {
      const _absolutePath = resolve(_path, _dir);
      if (
        fs.statSync(_absolutePath).isDirectory() &&
        !['stores'].includes(_dir)
      ) {
        if (fs.readdirSync(_absolutePath).includes('index.ts')) {
          modules.push(_absolutePath.replace(modulePath, './modules'));
        } else {
          detectModules(_absolutePath);
        }
      }
    });
  };

  detectModules(modulePath);
  return modules;
};

export function getMenuModules() {
  const modulePath = resolve('modules');
  let menus = {};
  fs.readdirSync(modulePath).forEach((_dir: string) => {
    const _absolutePath = `${modulePath}/${_dir}`;
    if (
      fs.statSync(_absolutePath).isDirectory() &&
      fs.readdirSync(_absolutePath).includes('menu.json')
    ) {
      const menuModuleString = fs.readFileSync(
        `${_absolutePath}/menu.json`,
        'utf8'
      );
      const menuModule = JSON.parse(menuModuleString);
      menus = { ...menus, ...menuModule };
    }
  });

  return menus;
}
